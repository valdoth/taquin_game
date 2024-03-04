import 'package:flutter/material.dart';

class GridButton extends StatelessWidget {
  var click;
  final String text;
  GridButton(this.text, this.click, {super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      onPressed: click,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        text,
        style: const TextStyle(
          fontSize: 30,
          fontWeight: FontWeight.bold,
          color: Colors.blue
        ),
      ),
    );
  }
}
